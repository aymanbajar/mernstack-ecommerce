import { useTranslation } from "react-i18next";
export  default function OrderSuccessPage() {
    const { t } = useTranslation();
    return <div className="text-center text-3xl font-bold mt-20 text-green-600">{t("Order Success!")}</div>;

}