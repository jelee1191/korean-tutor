// Browser's built-in text-to-speech (FREE)
export const speakKorean = (text: string, rate: number = 0.85) => {
  if (typeof window === 'undefined') return

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ko-KR'
  utterance.rate = rate // 0.85 = slightly slower for learning
  utterance.pitch = 1.0

  // Try to use a Korean voice if available
  const voices = window.speechSynthesis.getVoices()
  const koreanVoice = voices.find(voice => voice.lang.startsWith('ko'))
  if (koreanVoice) {
    utterance.voice = koreanVoice
  }

  window.speechSynthesis.speak(utterance)
}

// Load voices (some browsers need this)
export const loadVoices = () => {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve()
      }
    }
  })
}

// Check if speech synthesis is available
export const isSpeechAvailable = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
