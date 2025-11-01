import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { RadioButton, Checkbox, Text, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";

import { Page } from "@/components/page";
import { TypoGraphy } from "@/components/typography";
import { Space } from "@/components/space";
import { Button } from "@/components/button";
import { themes } from "@/themes";

import questionsData from "../questions.json";

export default function QuestionnaireScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const { title, questions } = questionsData;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderOptions = () => {
    switch (currentQuestion.type) {
      case "single_select":
        return (
          <RadioButton.Group
            onValueChange={(value) => handleAnswerSelect(value)}
            value={answers[currentQuestion.id]}
          >
            {currentQuestion.options?.map((option) => (
              <View key={option} style={styles.optionContainer}>
                <RadioButton value={option} color={themes.light.primary[100]} />
                <Text>{option}</Text>
              </View>
            ))}
          </RadioButton.Group>
        );
      case "multi_select":
        const currentAnswers = answers[currentQuestion.id] || [];
        return (
          <>
            {currentQuestion.options?.map((option) => (
              <View key={option} style={styles.optionContainer}>
                <Checkbox
                  status={
                    currentAnswers.includes(option) ? "checked" : "unchecked"
                  }
                  color={themes.light.primary[100]}
                  onPress={() => {
                    const newSelection = currentAnswers.includes(option)
                      ? currentAnswers.filter((item: string) => item !== option)
                      : [...currentAnswers, option];
                    handleAnswerSelect(newSelection);
                  }}
                />
                <Text>{option}</Text>
              </View>
            ))}
          </>
        );
      case "rating":
        return (
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((rating) => {
                  const isSelected = answers[currentQuestion.id] === rating;
                  return (
                    <Pressable
                      key={rating}
                      style={[
                        styles.ratingButton,
                        isSelected && {
                          backgroundColor: themes.light.primary[100],
                        },
                      ]}
                      onPress={() => handleAnswerSelect(rating)}
                    >
                      <TypoGraphy.button
                        style={
                          isSelected && { color: themes.light.text[200] }
                        }
                      >
                        {rating}
                      </TypoGraphy.button>
                    </Pressable>
                  );
                })}
              </View>
            );
          default:
            return null;
        }
      };

      if (isCompleted) {
        return (
          <Page>
            <View style={styles.centeredContainer}>
              <TypoGraphy.h1>Questionário Concluído!</TypoGraphy.h1>
              <TypoGraphy.p>Obrigado por suas respostas.</TypoGraphy.p>
              <Space />
              <Button onPress={() => router.push("/(tabs)")}>
                <TypoGraphy.button>Voltar para a Home</TypoGraphy.button>
              </Button>
            </View>
          </Page>
        );
      }

      return (
        <Page>
          <View style={styles.container}>
            <View>
              <View style={styles.progressContainer}>
                <Text>{`Pergunta ${
                  currentQuestionIndex + 1
                } de ${totalQuestions}`}</Text>
                <ProgressBar
                  progress={(currentQuestionIndex + 1) / totalQuestions}
                  style={styles.progressBar}
                  color={themes.light.primary[100]}
                />
              </View>
              <Space />
              <TypoGraphy.p>{currentQuestion.text}</TypoGraphy.p>
              <Space />
              {renderOptions()}
            </View>

            <View style={styles.navigationContainer}>
              <Button
                variant="outline"
                onPress={handleBack}
                disabled={currentQuestionIndex === 0}
                style={styles.navButton}
              >
                <TypoGraphy.button>Voltar</TypoGraphy.button>
              </Button>
              <Button
                onPress={handleNext}
                disabled={!answers[currentQuestion.id]}
                style={styles.navButton}
              >
                <TypoGraphy.button>Próxima</TypoGraphy.button>
              </Button>
            </View>
          </View>
        </Page>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    marginTop: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: themes.light.primary[100],
  },
  ratingButtonSelected: {
    backgroundColor: themes.light.primary[100],
  },
  ratingText: {
    fontSize: 18,
  },
  ratingTextSelected: {
    color: themes.light.text[200],
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    gap: 16,
  },
  navButton: {
    flex: 1,
  },
});
