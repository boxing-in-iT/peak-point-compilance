import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Создаем мок-адаптер для axios
const mock = new MockAdapter(axios);

// Мокируем запрос на авторизацию
mock.onPost("/login").reply(200, {
  token: "fake-jwt-token",
});

// Мокируем запрос на получение информации о пользователе
mock.onGet("/user").reply(200, {
  email: "test@example.com",
  password: "test",
});

export default mock;
