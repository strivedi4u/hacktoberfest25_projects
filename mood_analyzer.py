def analyze_mood(text):
    happy_words = ["happy", "joy", "excited", "great", "fantastic", "love"]
    sad_words = ["sad", "unhappy", "bad", "depressed", "angry", "hate"]

    text = text.lower()
    mood_score = 0

    for word in happy_words:
        if word in text:
            mood_score += 1

    for word in sad_words:
        if word in text:
            mood_score -= 1

    if mood_score > 0:
        return "😊 You seem happy!"
    elif mood_score < 0:
        return "😢 You seem sad."
    else:
        return "😐 Your mood is neutral."

if __name__ == "__main__":
    user_input = input("How are you feeling today? ")
    print(analyze_mood(user_input))
