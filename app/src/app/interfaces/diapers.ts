export interface Size {
    size: string;
    avaliable: number;
    purchased: number;
    time_to_zero: number;
}

export interface Diaper {
    _id: string;
    _rev: string;
    model: string;
    description: string;
    sizes: Array<Size>;
}

export interface Row {
    id: string;
    key: string;
    value: Diaper
}

export interface Data {
    total_rows: number,
    offset: number,
    rows: Array<Row>
}

export interface Message {
    message: string
}
