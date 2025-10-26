#include <iostream>
#include <conio.h>   // for _kbhit() and _getch()
#include <windows.h> // for Sleep()
#include <vector>
#include <cstdlib>
#include <ctime>

using namespace std;

const int width = 20;
const int height = 20;

int x, y, fruitX, fruitY, score;
vector<int> tailX;
vector<int> tailY;

enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };
eDirection dir;

bool gameOver;

void Setup() {
    srand(time(0));
    gameOver = false;
    dir = STOP;
    x = width / 2;
    y = height / 2;
    fruitX = rand() % width;
    fruitY = rand() % height;
    score = 0;
    tailX.clear();
    tailY.clear();
}

void Draw() {
    system("cls"); // clear screen

    // top wall
    for (int i = 0; i < width + 2; i++) cout << "#";
    cout << endl;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (j == 0) cout << "#"; // left wall

            if (i == y && j == x)
                cout << "O"; // snake head
            else if (i == fruitY && j == fruitX)
                cout << "F"; // fruit
            else {
                bool printTail = false;
                for (size_t k = 0; k < tailX.size(); k++) {
                    if (tailX[k] == j && tailY[k] == i) {
                        cout << "o"; // tail
                        printTail = true;
                        break;
                    }
                }
                if (!printTail) cout << " ";
            }

            if (j == width - 1) cout << "#"; // right wall
        }
        cout << endl;
    }

    // bottom wall
    for (int i = 0; i < width + 2; i++) cout << "#";
    cout << endl;

    cout << "Score: " << score << endl;
}

void Input() {
    if (_kbhit()) {
        switch (_getch()) {
        case 'a': if(dir != RIGHT) dir = LEFT; break;
        case 'd': if(dir != LEFT) dir = RIGHT; break;
        case 'w': if(dir != DOWN) dir = UP; break;
        case 's': if(dir != UP) dir = DOWN; break;
        case 'x': gameOver = true; break;
        }
    }
}

void Logic() {
    // move tail
    if (!tailX.empty()) {
        tailX.insert(tailX.begin(), x);
        tailY.insert(tailY.begin(), y);
        tailX.pop_back();
        tailY.pop_back();
    }

    // move head
    switch (dir) {
    case LEFT: x--; break;
    case RIGHT: x++; break;
    case UP: y--; break;
    case DOWN: y++; break;
    default: break;
    }

    // wall collision
    if (x < 0 || x >= width || y < 0 || y >= height)
        gameOver = true;

    // tail collision
    for (size_t i = 0; i < tailX.size(); i++)
        if (tailX[i] == x && tailY[i] == y)
            gameOver = true;

    // fruit collision
    if (x == fruitX && y == fruitY) {
        score += 10;
        fruitX = rand() % width;
        fruitY = rand() % height;
        tailX.push_back(x);
        tailY.push_back(y);
    }
}

int main() {
    Setup();
    while (!gameOver) {
        Draw();
        Input();
        Logic();
        Sleep(100); // control speed
    }

    cout << "Game Over! Final Score: " << score << endl;
    return 0;
}
