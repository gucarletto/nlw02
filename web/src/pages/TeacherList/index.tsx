import React, { useState, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList() {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
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
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => {setWeekDay(e.target.value)}}
            options={[
              { id : 1, label: 'Domingo'},
              { id : 2, label: 'Segunda-feira'},
              { id : 3, label: 'Terça-feira'},
              { id : 4, label: 'Quarta-feira'},
              { id : 5, label: 'Quinta-feira'},
              { id : 6, label: 'Sexta-feira'},
              { id : 7, label: 'Sábado'},
            ]}
          />
          <Input name="time" type="time" label="Horário" value={time} onChange={(e) => {setTime(e.target.value)}} />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}

      </main>
    </div>
  );
}

export default TeacherList;