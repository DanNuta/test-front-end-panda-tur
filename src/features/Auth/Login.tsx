import { Button, Form, Input, Typography, App } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";

import { AuthWrapper } from "@/components";
import { api } from "@/api";
import { Login as LoginBody } from "@/api/auth";
import { getServerError } from "@/utils";
import { TOKEN_LOCAL_STORAGE } from "@/app-constants";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();

  const login = async (values: LoginBody) => {
    setIsLoading(true);
    try {
      const { token } = await api.auth.login(values);
      localStorage.setItem(TOKEN_LOCAL_STORAGE, token);
      window.location.reload();
    } catch (e) {
      message.error(getServerError(e as AxiosError<{ message: string }>));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Typography.Title level={2}>Autentificare</Typography.Title>
      <Form layout="vertical" name="auth" onFinish={login} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", max: 180, required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Parola"
          name="password"
          rules={[
            {
              required: true,
              min: 8,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="text-center">
          <Link to="/register">Creează un cont</Link>
        </Form.Item>

        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Autentificare
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
