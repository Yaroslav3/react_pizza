import {Control} from "react-hook-form";

export namespace CoreModelsInterface {
    export interface IFormOrder {
        city: string,
        street: string,
        buildingNumber: string,
        entrance: string,
        numberFleet: string,
        floor: string,
        codeEnter: string,
    }
    export interface IFormOrderWithYou {
        streetShop: string,
    }

    export interface DataFiled {
        control?: Control<any>
        name: string,
        label: string;
        placeholder: string;
        type: 'text' | 'select' | 'textarea';
        pattern?: {
            value: RegExp,
            message: string
        };
        optionsSelect?: { label: string; value: string }[]
    }
}
