import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([{
    week_day: 0,
    from: '',
    to: ''
  }]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: ""
      }
    ]);
  }

  function setScheduleItemValue(position: number, fieldName: string, value: string) {
    const updatedScheduledItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [fieldName]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduledItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      schedule: scheduleItems,
      cost: Number(cost)
    }).then(() => {
      alert('Deu certo');
      history.push('/');
    }).catch(() => {
      alert('Deu errado');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input label="Nome completo" name="name" value={name} onChange={(e) => {setName(e.target.value)}} />
            <Input label="Avatar" name="avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}} />
            <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
            <Textarea label="Biografia" name="bio" value={bio} onChange={(e) => {setBio(e.target.value)}} />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => {setSubject(e.target.value)}}
              options={[
                { id : 1, label: 'Matemática'},
                { id : 2, label: 'Artes'},
                { id : 3, label: 'Biologia'},
                { id : 4, label: 'Matemática'},
                { id : 5, label: 'Química'},
                { id : 6, label: 'Física'},
                { id : 7, label: 'Sociologia'},
                { id : 8, label: 'Filosofia'},
              ]}
            />
            <Input label="Custo da hora por aula" name="cost" value={cost} onChange={(e) => {setCost(e.target.value)}} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>
            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { id : 1, label: 'Domingo'},
                      { id : 2, label: 'Segunda-feira'},
                      { id : 3, label: 'Terça-feira'},
                      { id : 4, label: 'Quarta-feira'},
                      { id : 5, label: 'Quinta-feira'},
                      { id : 6, label: 'Sexta-feira'},
                      { id : 7, label: 'Sábado'},
                    ]}/>
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Ícone de aviso"/>
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;