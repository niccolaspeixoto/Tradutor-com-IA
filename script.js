const translateButton = document.querySelector('#translateButton');
const microphoneButton = document.querySelector('#microphoneButton');
const inputText = document.querySelector('.input-text');
let newText = document.querySelector('#translatedText');
let languageSelect = document.querySelector('.language');
let inputLanguageSelect = document.querySelector('.input-container');

const translating = async () => {

    //endereço do servidor de tradução
    let url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(inputText.value)
        + "&langpair="
        + inputLanguageSelect.value
        + "|"
        + languageSelect.value;

    //resposta do servidor
    let response = await fetch(url)

    //converte a resposta em json
    let data = await response.json()

    //pega o texto traduzido
    newText.innerHTML = data.responseData.translatedText;

}

translateButton.addEventListener('click', translating);


const VoiceRecognition = () => {

    // ferramenta de reconhecimento de voz do navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
        alert('Seu navegador não suporta reconhecimento de voz 😢');
        return;
    }

    const recognition = new SpeechRecognition()

    //configurando a ferramenta para reconhecer diferentes idiomas
    const speechLanguages = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        ja: 'ja-JP'
    }

    const inputLanguageSelect = document.querySelector('.input-container')
    const selectedLang = inputLanguageSelect.value

    recognition.lang = speechLanguages[selectedLang] || 'en-US'
    recognition.interimResults = false

    //avisa quando termina o reconhecimento de voz
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        inputText.value = transcript

        translating()

    }

    recognition.start()

}

microphoneButton.addEventListener('click', VoiceRecognition);



/**
 * padrao = https://api.mymemory.translated.net/get?q=
 * traduzir = Hello World! 
 * idioma= &langpair=pt-br|en
 * 
 */