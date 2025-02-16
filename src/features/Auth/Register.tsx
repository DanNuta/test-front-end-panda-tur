import { Button, Form, Input, Typography, App } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

import { AuthWrapper } from "@/components";
import { Register as RegisterBody } from "@/api/auth";
import { api } from "@/api";
import { AxiosError } from "axios";
import { getServerError } from "@/utils";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const validatePasswordField = (_: RuleObject, value: StoreValue) => {
    if (!value || typeof value !== "string") {
      return Promise.reject("Parola este obligatorie");
    }
    if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(value)) {
      return Promise.reject(
        "Parola trebuie să conțină minim 8 caractere, cel puțin o literă mare și un simbol"
      );
    }

    return Promise.resolve();
  };

  const register = async (values: RegisterBody) => {
    setIsLoading(true);
    try {
      await api.auth.register(values);
      navigate("/login");
    } catch (e) {
      message.error(getServerError(e as AxiosError<{ message: string }>));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <Typography.Title level={2}>Înregistrare</Typography.Title>
      <Form
        layout="vertical"
        name="auth"
        onFinish={register}
        autoComplete="off"
      >
        <Form.Item
          label="Nume"
          name="username"
          rules={[{ max: 180, required: true }]}
        >
          <Input />
        </Form.Item>

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
              validator: validatePasswordField,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="text-center">
          <Link to="/login"> Ai deja un cont ?</Link>
        </Form.Item>

        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Înregistrare
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};
