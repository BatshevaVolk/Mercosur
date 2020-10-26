export class UserLoginI {
    token: string;
    userId: string;
    role: string;
    fullName: string;
    orgName: string;
    constructor() {
        this.token = localStorage.getItem("token");
        this.userId = localStorage.getItem("userId");
        this.role = localStorage.getItem("role");
        this.fullName = localStorage.getItem("fullName");
        this.orgName = localStorage.getItem("orgName");
    }
    clear() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");
        localStorage.removeItem("orgName");

    }
}
