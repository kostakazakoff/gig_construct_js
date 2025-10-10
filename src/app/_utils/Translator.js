export default function Translate(dataToTranslate) {
    if (!dataToTranslate || !dataToTranslate.data || !dataToTranslate.language) {
        console.warn("Invalid data or language for translation:", dataToTranslate);
        return dataToTranslate?.data || {};
    }
    let translation = dataToTranslate.data.BG;
    if (dataToTranslate.language === "EN" && translation !== dataToTranslate.data.EN) {
        translation = dataToTranslate.data.EN;
    }

    return translation;
}
