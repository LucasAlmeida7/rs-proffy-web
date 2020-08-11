import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../api';

function TeacherForm() {
const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState(0);

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    }
    
    function setScheduleItemValue(index: number, field: string, value: string){
        const newArray = scheduleItems.map((item, i) => {
            if(index === i) {
                return { ...item, [field]: value };
            }

            return item;
        });

        setScheduleItems(newArray);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('OK');
            history.push('/');
        }).catch(error => {
            console.log('Error: ', error);
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher o formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="name" label="Nome Completo"
                            value={name} onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input name="avatar" label="Avatar"
                            value={avatar} onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input name="whatsapp" label="Whatsapp"
                            value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <TextArea name="bio" label="Biografia"
                            value={bio} onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Matemática', label: 'Matemática' }
                            ]}
                            value={subject} onChange={(e) => { setSubject(e.target.value) }}
                        />
                        <Input name="cost" label="Custo da sua hora por aula"
                            value={cost} onChange={(e) => { setCost(Number(e.target.value)) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                        </button>
                        </legend>

                        {
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select
                                            name="week_day"
                                            label="Dia da Semana"
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                            options={[
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda' },
                                                { value: '2', label: 'Terça' },
                                                { value: '3', label: 'Quarta' },
                                                { value: '4', label: 'Quinta' },
                                                { value: '5', label: 'Sexta' },
                                                { value: '6', label: 'Sábado' },
                                            ]}
                                        />
                                        <Input type="time" name="from" label="Dos" 
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />
                                        <Input type="time" name="to" label="Até" 
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
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;