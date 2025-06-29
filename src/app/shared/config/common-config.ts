import { ChartTypeRegistry } from "chart.js";
import { ErrorData, HtmlLabel, Message, Routes, SheetNames, SideBar, Snackbar } from "../interface/interface";


export const ROUTES : Routes = {
    AUTH : "auth",
    LOGIN : "login",
    REGISTER : "register",
    EXPENSE: "expense",
    DASHBOARD: "dashboard",
    ADD_EXPENSE: "add-expense",
    LIST_EXPENSE: "show-all-expenses",
    ERROR_PAGE: "error"
}

export const HTMLLABEL : HtmlLabel = {
    TEXT: {
        LOGIN_FORM_HEADER: "User Login",
        NO_ACCOUNT: "Don't have an account?",
        REGISTER_FORM_HEADER: "Create User",
        ACOOUNT_ALREADY_PRESENT: "Already have an account",
        APPLICATION_NAME: "Expense Tracker",
        GRAPH_NAME: "Expense Overview",
        PIE_CHART_NAME: "Expense Split Up",
        CATEGORY: "Category",
        MODE: "Mode",
        ALL_EXPENSES: "All Expenses",
        TOTAL_EXPENSE: "Total Expenese",
        THIS_MONTH: "This month",
        THIS_WEEK: "This week",
        TODAY: "Today",
        EXPENSE: "Expense",
        AMOUNT: "Amount",
        DATE: "Date",
        DELETE_DIALOG_HEADER: "Are you sure?",
        DELETE_DIALOG_QUESTION: "Do you want to delete :",
        ADD_CATEGORY: "Add Category",
        WELCOME: "Welcome",
        PROFILE: "Profile",
        LOG_OUT: "Log Out",
        FIRST_NAME: "First Name",
        LAST_NAME: "Last Name",
        ADDRESS: "Address",
        PHONE: "Phone",
        ADD_EXPENSE: "Add Expense",
        NO_DASHBOARD_TEXT: '"Hmmm...that blue button must be important...."',
        NO_EXPENSE_FOUND: "No Expenses Found",
        NOTE: "Note",
        BAR_GRAPH: "Bar Graph",
        LINE_GRAPH: "Line Graph",
        RECENT_TRANSACTIONS: "Recent Expenses",
        TOP_SPENT: "Top Expenses"
    },
    BUTTON: {
        LOGIN: "Login",
        SIGN_UP: "Sign Up",
        YES: "Yes",
        NO: "No",
        ADD_CATEGORY: "Add Category",
        CANCEL: "Cancel",
        EDIT_EXPENSE: "Update",
        UPDATE: "Update",
        EDIT: "Edit",
        ADD_EXPENSE: "Add Expense"
    }, 

    PLACEHOLDER: {
        ENTER_EMAIL: "Enter Email",
        ENTER_PASSWORD: "Enter Password",
        ENTER_FIRST_NAME: "Enter First Name",
        ENTER_LAST_NAME: "Enter Last Name",
        ENTER_PHONE: "Enter Phone Number",
        ENTER_ADDRESS: "Enter Address",
        ENTER_EXPENSE: "Enter Expense",
        ENTER_AMOUNT: "Enter Amount",
        SELECT_MODE: "Select a mode",
        SELECT_CATEGORY: "Select a category",
        ENTER_CATEGORY: "Enter Category",
        ENTER_NOTE: "Enter Note"
    },

    TABLE: {
        EXPENSE: "Expense",
        CATEGORY: "Category",
        AMOUNT: "Amount",
        MODE: "Mode",
        ACTION: "Actions",
        DATE: "Date",
        NOTE: "Note"
    }
}

export const VALIDATION_LIMIT = {
    PASSWORD_MIN_LENGTH: 4,
    PASSWORD_MAX_LENGTH: 10,
    STRING_MAX_LENGTH: 20,
    LIST_ALL_EXPENSE_ROW_LIMIT: 15,
}

export const VALIDATION_REGEX = {
    NAME_REGEX:  /^[a-zA-Z]+[a-zA-Z ]*$/,
    PHONE_NUMBER_REGEX: /^\d{10}$/,
    AMOUNT_REGEX: /^\d+(\.\d{1,2})?$/
}

export const MESSAGES : Message = {
    ERROR: {
        FILL_ALL: "Please fill all the fields",
        SERVER_ERROR: "Sorry, Something went wrong, Can you please try again later",
        EMAIL_REQUIRED: "Email is required",
        EMAIL_INVALID: "Email is invalid",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_MIN_LENGTH: `Password should have minimum ${VALIDATION_LIMIT.PASSWORD_MIN_LENGTH} characters`,
        PASSWORD_MAX_LENGTH: `Password should have maximum ${VALIDATION_LIMIT.PASSWORD_MAX_LENGTH} characters`,
        PASSWORD_STRENGTH: "Password is not strong enough",
        FIRST_NAME_REQUIRED: "First name is required",
        FIRST_NAME_INVALID: "First name is invalid",
        LAST_NAME_REQUIRED: "Last name is required",
        LAST_NAME_INVALID: "Last name is invalid",
        PHONE_NUMBER_REQUIRED: "Phone number is required",
        PHONE_NUMBER_INVALID: "Phone number is invalid",
        ADDRESS_REQUIRED: "Address is required",
        EXPENSE_REQUIRED: "Expense is required",
        EXPENSE_INVALID: "Expense is invalid",
        AMOUNT_REQUIRED: "Amount is required",
        AMOUNT_INVALID: "Amount is invalid",
        DATE_REQUIRED: "Date is required",
        MODE_REQUIRED: "Mode is required",
        CATEGORY_REQUIRED: "Category is required",
        INVALID_FIELD: (field: string) => `${field} is invalid`,
        INVALID_IMAGE_TYPE: "File should be of type jpg, jpeg or png",
        ALLOWED_FILE_SIZE: (size: string) => `File size should be less than or equal to ${size}`
    },
    SUCCESS: {
        CATEGORY_ADDED: "Category added successfully",
        LOGGED_OUT: "Logged out successfully",     
    }
}

export const SNACKBAR : Snackbar = {
    DELAY: 2000,
    SUCCESS: 'success',
    ERROR: 'error'
}



export const SIDEBAR: SideBar[] = [
    {
        title: "Dashboard",
        path: ROUTES.DASHBOARD,
        isActive: false,
        icon: "assets/icons/dashboard.png"
    },
    {
        title: "Show All Expenses",
        path: ROUTES.LIST_EXPENSE,
        isActive: false,
        icon: "assets/icons/all-expenses.png"
    },
    {
        title: "Add Expense",
        path: ROUTES.ADD_EXPENSE,
        isActive: false,
        icon: "assets/icons/add-expense.png"
    }
];


export const ERROR_PAGE = {
    INTERNAL_SERVER_ERROR: {
        code: "500",
        type: "OOPS! Internal Server Error",
        text: "Internal Server Error Boo-Boo: Our Bad! The server hiccuped. We're dusting off the code and will have it sorted soon. Please be patient",
        button_text: "Be Patient, Try Again",
        icon: {
            light_theme: "assets/icons/500-light.png",
            dark_theme: "assets/icons/500-dark.png"
        }
    },
    PAGE_NOT_FOUND: {
        code: "404",
        type: "OOPS! Page Not Found",
        text: "Oopsie-daisy! The page you requested seems to have taken a vacation. Return to the home page and continue your journey.",
        button_text: "Back to Safety",
        icon: {
            light_theme: "assets/icons/not-found-light.png",
            dark_theme: "assets/icons/not-found-dark.png"
        }
    },
    FORBIDDEN: {
        code: "403",
        type: "OOPS! Forbidden",
        text: "This page is more off-limits than Area 51....Only those with super clearance can proceed",
        button_text: "Log In",
        icon: {
            light_theme: "assets/icons/access-denied-light.png",
            dark_theme: "assets/icons/access-denied-dark.png"
        }
    }
}

export const SHEET_NAMES: SheetNames = {
    MODE: "Mode",
    CATEGORY: "Category",
    EXPENSE: "Expenses"
}

export const LOCALSTORAGE_KEYS = {
    TOKEN: "token"
}


export const chartConfig = {
    TEXT_COLOR: "#acaeb3",
    BAR_COLOR: "#6366f1",
    BAR_LABEL: "Expense",
    X_AXIS: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
    X_AXIS_MONTH: ["Jan", "Feb", "Mar", "Apr", "May" , "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

}

export const weekMonthGraphFilter = [
    {
        option: "This Week"
    },
    {
        option: "Last Week"
    },
    {
        option: "Monthly"
    }
];

export const modeCategoryFilter = [
    {
        option: "Mode"
    },
    {
        option: "Category"
    }
]


export const chartType: (keyof ChartTypeRegistry)[] = [
    "bar", 
    "line"
];
