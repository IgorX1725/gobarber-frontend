import React from "react";

import { FiClock, FiPower } from "react-icons/fi";
import {
  Container,
  Header,
  Headercontent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/Auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <Headercontent>
          <img src={logoImg} alt="logo Gobarber" />
          <Profile>
            <img src={user.avatar_url} alt="avatar" />

            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </Headercontent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>hoje</span>
            <span>dia 6</span>
            <span>segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt="avatar" />
              <strong>IgorX</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
