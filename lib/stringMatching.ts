// Fuzzy string matching utilities (NO API cost)

/**
 * Calculate Levenshtein distance (edit distance) between two strings
 * Returns the number of single-character edits needed to transform s1 into s2
 */
export const levenshteinDistance = (s1: string, s2: string): number => {
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null))

  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j
  }
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      )
    }
  }
  return track[s2.length][s1.length]
}

/**
 * Normalize Korean text for comparison
 * Removes extra whitespace, standardizes format
 */
export const normalizeKorean = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // normalize whitespace
    .toLowerCase()
}

/**
 * Check if user answer is acceptable
 * Returns { correct, feedback, confidence }
 */
export interface ValidationResult {
  correct: boolean
  feedback: string
  confidence: 'exact' | 'close' | 'wrong'
}

export const validateAnswer = (
  userAnswer: string,
  correctAnswer: string,
  allowTypos: boolean = true
): ValidationResult => {
  const user = normalizeKorean(userAnswer)
  const correct = normalizeKorean(correctAnswer)

  // Exact match
  if (user === correct) {
    return {
      correct: true,
      feedback: 'Perfect! ✨',
      confidence: 'exact'
    }
  }

  // Empty answer
  if (user.length === 0) {
    return {
      correct: false,
      feedback: 'Please type your answer',
      confidence: 'wrong'
    }
  }

  if (allowTypos) {
    // Calculate acceptable typo threshold (15% of length, minimum 1)
    const threshold = Math.max(1, Math.floor(correct.length * 0.15))
    const distance = levenshteinDistance(user, correct)

    if (distance <= threshold) {
      return {
        correct: true,
        feedback: 'Correct! (minor typo) ✓',
        confidence: 'close'
      }
    }
  }

  // Wrong answer - provide hint about what's expected
  const similarityPercent = Math.round(
    (1 - levenshteinDistance(user, correct) / Math.max(user.length, correct.length)) * 100
  )

  if (similarityPercent > 50) {
    return {
      correct: false,
      feedback: `Close! Check your spelling. Expected: ${correctAnswer}`,
      confidence: 'wrong'
    }
  }

  return {
    correct: false,
    feedback: `Not quite. The answer is: ${correctAnswer}`,
    confidence: 'wrong'
  }
}

/**
 * Highlight differences between user answer and correct answer
 */
export const highlightDifferences = (
  userAnswer: string,
  correctAnswer: string
): { char: string; status: 'correct' | 'wrong' | 'missing' }[] => {
  const result: { char: string; status: 'correct' | 'wrong' | 'missing' }[] = []
  const maxLen = Math.max(userAnswer.length, correctAnswer.length)

  for (let i = 0; i < maxLen; i++) {
    const userChar = userAnswer[i] || ''
    const correctChar = correctAnswer[i] || ''

    if (userChar === correctChar) {
      result.push({ char: userChar, status: 'correct' })
    } else if (userChar && !correctChar) {
      result.push({ char: userChar, status: 'wrong' })
    } else if (!userChar && correctChar) {
      result.push({ char: correctChar, status: 'missing' })
    } else {
      result.push({ char: correctChar, status: 'wrong' })
    }
  }

  return result
}
