import {  useTranslation } from "react-i18next";

export default function LoginPage() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('Login to your account')}</h1>

        <form >
        <div>
            <label htmlFor="email">{t('Email:')}</label>
            <input type="email" id="email" name="email" required />
        </div>

        <div>
            <label htmlFor="password">{t('Password:')}</label>
            <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">{t('Login')}</button>

        </form>



        </div>
    )
}