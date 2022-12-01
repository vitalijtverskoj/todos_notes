# import requests
# import time
#
# DOMAIN = 'http://127.0.0.1:8000'
#
#
# def timeout():
#     time.sleep(2)
#
#
# def get_url(url):
#     return f'{DOMAIN}{url}'
#
#
# timeout()
#
# # не авторизован
# response = requests.get(get_url('/api/users/'))
# assert response.status_code == 401
#
# timeout()
# # базовая авторизация
# response = requests.get(get_url('/api/users/'), auth=('admin', 'biped090989'))
# assert response.status_code == 200
#
# timeout()
# # авторизация по токену
# TOKEN = requests.post(get_url('/api-token-auth/'), data={'username': 'admin', 'password': 'biped090989'}).json().get(
#     'token')
# headers = {'Authorization': f'Token {TOKEN}'}
# response = requests.get(get_url('/api/users/'), headers=headers)
# assert response.status_code == 200
#
# timeout()
#
# # авторизация по jwt
# # Получаем токен
# response = requests.post(get_url('/api/token/'), data={'username': 'admin', 'password': 'biped090989'})
# result = response.json()
# access = result['access']
# print('Первый токен', access, end=f'\n{150 * "*"}\n')
# # это для рефреша
# refresh = result['refresh']
# print('refresh', refresh, end=f'\n{150 * "*"}\n')
# timeout()
# # Авторизуемся с токеном
# headers = {'Authorization': f'Bearer {access}'}
# response = requests.get(get_url('/api/users/'), headers=headers)
# assert response.status_code == 200
#
# timeout()
# # Рефрешим токен (для обновления)
# response = requests.post(get_url('/api/token/refresh/'), data={'refresh': refresh})
# # print(response.status_code)
# # print(response.text)
# result = response.json()
# # это наш токен
# access = result['access']
# print('Обновлённный токен', access, end=f'\n{150 * "*"}\n')
# print('refresh', refresh, end=f'\n{150 * "*"}\n')
# timeout()
# # Авторизуемся с токеном
# headers = {'Authorization': f'Bearer {access}'}
# response = requests.get(get_url('/api/users/'), headers=headers)
# assert response.status_code == 200
