import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface WelcomeEmailProps {
    userFirstname: string;
    confirmationLink:string
  }
  
  
  export const WelcomeEmail= ({
    userFirstname,
    confirmationLink
  }: WelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>
      Manage your inventory with ease
      </Preview>
      <Body style={main}>
        <Container style={container}>
          
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Welcome to Inventory App, Manage your inventory with ease, even with an irregular schedule.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={confirmationLink}>
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Inventory App team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            contact@soufian.me
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  WelcomeEmail.PreviewProps = {
    userFirstname: "Alan",
  } as WelcomeEmailProps;
  
  export default WelcomeEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#7C5DFA",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "180px",
    padding: "14px 7px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  