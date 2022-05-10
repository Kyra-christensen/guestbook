import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const server = setupServer(
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) => 
    res(
      ctx.json({
        "access_token": "MOCKED_ACCESS_TOKEN",
        "token_type": "bearer",
        "expires_in": 3600,
        "refresh_token": "MOCKED_REFRESH_TOKEN",
        "user": {
          "id": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
          "aud": "authenticated",
          "role": "authenticated",
          "email":"01@email.com",
          "email_confirmed_at": "2022-05-10T09:47:13.284987Z",
          "phone": "",
          "confirmed_at": "2022-05-10T09:47:13.284987Z",
          "last_sign_in_at": "2022-05-10T17:15:43.091729758Z",
          "app_metadata": {
            "provider": "email",
            "providers": [
              "email"
            ]
          },
          "user_metadata": {},
          "identities": [
            {
              "id":"cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
              "user_id":"cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
              "identity_data": {
                "sub": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
              },
              "provider": "email",
              "last_sign_in_at": "2022-05-10T17:15:43.091729758Z",
              "created_at":"2022-05-10T09:47:13.282344Z",
              "updated_at":"2022-05-10T09:47:13.282348Z",
            }
          ],
          "created_at":"2022-05-10T09:47:13.265826Z",
          "updated_at":"2022-05-10T17:15:43.092836Z",
        },
      }))
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/guestbook`, (req, res, ctx) => res(ctx.json([
    {
      "id": 7,
      "guest_id": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
      "content": "hello",
      "created_at": "2022-05-10T10:06:34.738377+00:00",
      "user_id": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594"
    },
  ]))),
  rest.post(`${process.env.SUPABASE_API_URL}/rest/v1/guestbook`, (req, res, ctx) => res(ctx.json(
    {
      "id": 8,
      "guest_id": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
      "user_id": "cfd6974c-6fc9-4a12-b2a1-facafdd2d594",
      "content": "yoooo",
      "created_at": "2022-05-10T18:00:54.380124+00:00"
    },
  )))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders a list of entries and when a new one is added', async () => {
    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    );

    const email = screen.getByRole('textbox');
    userEvent.type(email, '01@email.com');

    const password = screen.getByPlaceholderText(/Password/i);
    userEvent.type(password, '123456');

    const signUpButton = screen.getByRole('button', {name: /sign up/i});
    userEvent.click(signUpButton);

    const dashboardLink = await screen.findByRole('link', { name: /view dashboard/i });
    userEvent.click(dashboardLink);

    const header = await screen.findByText('logged in as 01@email.com');

    const entryInput = screen.getByPlaceholderText(/add an entry/i);
    userEvent.type(entryInput, 'yoooo');

    const addButton = screen.getByRole('button', { name: /add entry/i });
    userEvent.click(addButton);

    const newEntry = await screen.findByText('yoooo', { exact: false });
  })
})