export default function Translate(dataToTranslate) {
    let translation = dataToTranslate.data.BG;
    if (dataToTranslate.language === "EN" && translation !== dataToTranslate.data.EN) {
        translation = dataToTranslate.data.EN;
    }

    return translation;
}
