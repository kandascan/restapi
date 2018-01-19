import React from 'react';
import Jumbotron from './jumbotronComponent';
import Content from './contentComponent';
import Survey from './surveyComponents/surveyComponent'

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 1,
            header: 'Ankieta osobowa',
            user: 'Boguslaw Boczkowski',
            public: true,
            questions: [
                {
                    id: 1,
                    title: 'Jak masz na imie?',
                    isMandatory: true,
                    template: 'radiobutton',
                    answers: [
                        {
                            id: 1,
                            answer: 'Boguslaw'
                        },
                        {
                            id: 2,
                            answer: 'Maciek'
                        },
                        {
                            id: 3,
                            answer: 'Jacek'
                        },
                        {
                            id: 4,
                            answer: 'Krzychu'
                        },
                        {
                            id: 5,
                            answer: 'Stefan'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Jak jest twoj ulubiony kolor?',
                    isMandatory: true,
                    template: 'checkbox',
                    answers: [
                        {
                            id: 1,
                            answer: 'Czerwony'
                        },
                        {
                            id: 2,
                            answer: 'Zielony'
                        },
                        {
                            id: 3,
                            answer: 'Niebieski'
                        },
                        {
                            id: 4,
                            answer: 'Żółty'
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'W jakim mieście mieszkasz?',
                    isMandatory: true,
                    template: 'dropdownlist',
                    answers: [
                        {
                            id: 1,
                            answer: 'Poznań'
                        },
                        {
                            id: 2,
                            answer: 'Warszawa'
                        },
                        {
                            id: 3,
                            answer: 'Trzcianka'
                        },
                        {
                            id: 4,
                            answer: 'Piła'
                        },
                        {
                            id: 5,
                            answer: 'Chodzież'
                        },
                        {
                            id: 6,
                            answer: 'Wronki'
                        },
                        {
                            id: 7,
                            answer: 'Gostyń'
                        },
                        {
                            id: 8,
                            answer: 'Czarnków'
                        },
                        {
                            id: 9,
                            answer: 'Leszno'
                        },
                        {
                            id: 10,
                            answer: 'Kostrzyn'
                        }
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <Survey survey={this.state} />
            </div>
        )
    }
}