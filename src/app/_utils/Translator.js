export default function Translate(dataToTranslate) {
    if (!dataToTranslate || !dataToTranslate.data || !dataToTranslate.language) {
        console.warn("Invalid data or language for translation:", dataToTranslate);
        return dataToTranslate?.data || {};
    }
    let translation = dataToTranslate.data.bg;
    if (dataToTranslate.language === "en" && translation !== dataToTranslate.data.en) {
        translation = dataToTranslate.data.en;
    }

    return translation;
}
