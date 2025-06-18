export interface Routes {
    AUTH: string,
    LOGIN : string,
    REGISTER: string,
    DASHBOARD: string,
    ADD_EXPENSE: string,
    LIST_EXPENSE: string,
    ERROR_PAGE: string,
    EXPENSE: string
}

export interface HtmlLabel {
    TEXT: any,
    BUTTON: any,
    PLACEHOLDER: any,
    TABLE: any
}

export interface Message {
    ERROR: any,
    SUCCESS: any
}

export interface Snackbar {
    DELAY: number,
    SUCCESS: string,
    ERROR: string
}

export interface SideBar {
    path: string;
    title: string;
    icon: string;
    isActive: boolean;
}

export interface SheetNames {
    MODE: string;
    CATEGORY: string;
    EXPENSE: string;
}

export interface ErrorData {
    code: string;
    type: string;
    text: string;
    button_text: string;
    icon: {
        light_theme: string;
        dark_theme: string
    }
}

export interface TableViewInput {
    title: string;
    tableData: any[];
    options: {
        canSort: boolean,
        canSearchAnDownload: boolean,
        isCustomColumn: boolean
    }
}

export interface ExpenseStats {
    total: string;
    thisMonth: string;
    thisWeek: string;
    today: string
}