import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AdduserProps {
  userFirstname: string;
  passwod: string;
  email: string;
}

export const Adduser = ({ userFirstname, passwod, email }: AdduserProps) => (
  <Html>
    <Head />
    <Preview>Manage your inventory with ease</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Inventory App, Manage your inventory with ease, even with
          an irregular schedule.
        </Text>
        <Section style={btnContainer}>
          <p>Email: {email}</p>
          password: {passwod}
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Inventory App team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>contact@soufian.me</Text>
      </Container>
    </Body>
  </Html>
);

Adduser.PreviewProps = {
  userFirstname: "Alan",
} as AdduserProps;

export default Adduser;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};


const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
