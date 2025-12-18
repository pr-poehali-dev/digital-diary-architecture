import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    """Создает подключение к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Обработчик настроек пользователя
    Получение и сохранение выбранных метрик
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id_str = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    
    if not user_id_str:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    try:
        user_id = int(user_id_str)
    except ValueError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный токен'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            cur.execute("""
                SELECT selected_metrics, onboarding_completed 
                FROM user_settings 
                JOIN users ON users.id = user_settings.user_id
                WHERE user_id = %s
            """, (user_id,))
            
            result = cur.fetchone()
            
            if result:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'metrics': result[0],
                        'onboarding_completed': result[1]
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'metrics': [],
                        'onboarding_completed': False
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            metrics = body.get('metrics', [])
            
            if not isinstance(metrics, list):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Метрики должны быть списком'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("""
                INSERT INTO user_settings (user_id, selected_metrics)
                VALUES (%s, %s)
                ON CONFLICT (user_id) 
                DO UPDATE SET 
                    selected_metrics = EXCLUDED.selected_metrics,
                    updated_at = CURRENT_TIMESTAMP
            """, (user_id, json.dumps(metrics)))
            
            cur.execute("""
                UPDATE users 
                SET onboarding_completed = TRUE 
                WHERE id = %s
            """, (user_id,))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'metrics': metrics
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
