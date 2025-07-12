export const formatPinInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 16);
    return limited.replace(/(\d{4})(?=\d)/g, "$1-");
};

export const formatCurrencyInput = (value: string) => {
    const filtered = value.replace(/[^0-9.]/g, "");

    const parts = filtered.split(".");
    if (parts.length > 2) {
        return parts[0] + "." + parts.slice(1).join("");
    }

    return filtered;
};

export const formatCurrency = (value: string) => {
    const digits = value.replace(/[^0-9.]/g, "");
    const numberValue = parseFloat(digits);
    if (isNaN(numberValue)) return "";
    return numberValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};