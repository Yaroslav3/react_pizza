import {CoreModelsInterface} from "../../interface/core-models-interface.tsx";
import * as yup from "yup"
import {InferType} from "yup";

export const schemaFieldsDelivery = yup
    .object({
        city: yup.string().required('Введіть місто'),
        street: yup.string().required('Введіть вулицю'),
        buildingNumber: yup.string().required('Введіть номер дому'),
        entrance: yup.string().required('Введіть під’їзд'),
        numberFleet: yup.string().required('Введіть номер квартири'),
        floor: yup.string().required('Введіть поверх'),
        codeEnter: yup.number().positive().typeError('Введіть код, числом'),
    }).required()

export const fieldsDelivery: Array<CoreModelsInterface.DataFiled> = [
    {name: 'city', type: 'text', label: 'Місто', placeholder: 'Введіть місто'},
    {name: 'street', type: 'text', label: 'Вулиця', placeholder: 'Введіть вулицю'},
    {name: 'buildingNumber', type: 'text', label: 'Номер дому', placeholder: 'Введіть номер дому'},
    {name: 'entrance', type: 'text', label: 'Під’їзд', placeholder: 'Введіть під’їзд'},
    {name: 'numberFleet', type: 'text', label: 'Номер квартири', placeholder: 'Введіть номер квартири'},
    {name: 'floor', type: 'text', label: 'Поверх', placeholder: 'Введіть поверх'},
    {name: 'codeEnter', type: 'text', label: 'Код домофону', placeholder: 'Введіть код'}
];

export const schemaFieldWithYou = yup
    .object({
        streetShop: yup.string().required('Оберіть ресторан!'),
    }).required()

export const fieldOrderWithYou: Array<CoreModelsInterface.DataFiled> = [
    {name: 'streetShop', type: 'select', label: 'Ресторан', placeholder: 'Ресторан',
        optionsSelect: [
            {label: 'Здановської 14/5', value: 'Смачна піца 1'},
            {label: 'Ахматової 6-а', value: 'Смачна піца 2'},
            {label: 'Руштавелі 45/4-а', value: 'Смачна піца 3'},
            {label: 'Грушевського 4', value: 'Смачна піца 4'},
            {label: 'Юлії Здановської 86/Б', value: 'Смачна піца 5'},
            {label: 'Кримська 45-а', value: 'Смачна піца 6'},
        ]},
];
type delivery = InferType<typeof schemaFieldsDelivery>;
type withYou = InferType<typeof schemaFieldWithYou>;
