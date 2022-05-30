import java.util.Random;
import java.util.Scanner;

public class HW2_GalBirka {
	// declare static arrays
	static boolean[][] currentBoard;
	static boolean[][] newBoard;

	public static void main(String[] args) {

		// user input
		Scanner input = new Scanner(System.in);
		int boardSize, numOfBoards;
		System.out.println("********** GAME OF LIFE ON BOARD X * X **********");
		System.out.print("Enter X Size: ");
		boardSize = input.nextInt();
		System.out.print("Enter Max Numbers Of Board: ");
		numOfBoards = input.nextInt();
		input.close();

		// create base arrays
		currentBoard = new boolean[boardSize][boardSize];
		newBoard = new boolean[boardSize][boardSize];

		// generate first random board
		currentBoard = randomBoard(boardSize);

		// game loop. check every cell neighbors
		for (int k = 0; k < numOfBoards; k++) {
			newBoard = moveTimeBy(1);
			// check if new board is the same as current board (no changes made)
			if (sameBoards()) {
				System.out.printf("***No More Changes. Board Changed %d Times.***", k);
				break;
			}
			// check if the max number of boards has passed
			if (k == (numOfBoards - 1)) {
				System.out.println("Finished!");
				printBoard(newBoard);
				System.out.printf("Board Changed %d Times.", (k + 1));
				break;
			}
			// print and copy the new board, then start over
			System.out.printf("Step %d:\n", (k + 1));
			printBoard(newBoard);
			System.out.println("Board Changed.\n");
			copyBoard();
		}
	}

	// method used to copy board from new board to current board
	public static void copyBoard() {
		for (int i = 0; i < currentBoard.length; i++) {
			for (int j = 0; j < currentBoard[i].length; j++) {
				currentBoard[i][j] = newBoard[i][j];
			}
		}
	}

	// method used to print a selected board as 1's and 0's
	public static void printBoard(boolean[][] boardToPrint) {
		for (int i = 0; i < boardToPrint.length; i++) {
			for (int j = 0; j < boardToPrint[i].length; j++) {
				if (boardToPrint[i][j]) {
					System.out.print("1 ");
				} else {
					System.out.print("0 ");
				}
			}
			System.out.println();
		}
	}

	// method used to check if current board is the same as new board (no changes
	// made)
	public static boolean sameBoards() {
		int counter = 0;
		for (int i = 0; i < currentBoard.length; i++) {
			for (int j = 0; j < currentBoard[i].length; j++) {
				if (currentBoard[i][j] == newBoard[i][j]) {
					counter++;
				}
			}
		}
		if (counter == ((currentBoard.length) * (currentBoard.length))) {
			return true;
		}
		return false;
	}

	// method used to generated a random board and print it as 1's and 0's
	public static boolean[][] randomBoard(int size) {
		Random random = new Random();
		boolean[][] generatedBoard = new boolean[size][size];

		System.out.println("\nStart Board:");
		for (int i = 0; i < generatedBoard.length; i++) {
			for (int j = 0; j < generatedBoard[i].length; j++) {
				generatedBoard[i][j] = random.nextBoolean();
			}
		}
		printBoard(generatedBoard);
		System.out.println();
		return generatedBoard;
	}

	// method used to check a cell neighbors and count how many alive
	public static boolean checkNeighbors(int i, int j, int size) {
		int iUp, iDown, jUp, jDown, counter = 0;
		boolean state = currentBoard[i][j];
		size = (size - 1);

		if (i - 1 < 0)
			iDown = size;
		else
			iDown = (i - 1);
		if (i + 1 > size)
			iUp = 0;
		else
			iUp = (i + 1);
		if (j - 1 < 0)
			jDown = size;
		else
			jDown = (j - 1);
		if (j + 1 > size)
			jUp = 0;
		else
			jUp = (j + 1);

		if (currentBoard[iDown][jDown])
			counter++;
		if (currentBoard[iDown][j])
			counter++;
		if (currentBoard[iDown][jUp])
			counter++;
		if (currentBoard[i][jDown])
			counter++;
		if (currentBoard[i][jUp])
			counter++;
		if (currentBoard[iUp][jDown])
			counter++;
		if (currentBoard[iUp][j])
			counter++;
		if (currentBoard[iUp][jUp])
			counter++;

		state = deadOrAlive(counter, state);
		return state;
	}

	// method used to decide the status of the selected cell
	public static boolean deadOrAlive(int counter, boolean state) {
		if (state) {
			if (counter > 4 || counter < 2)
				state = false;
		} else {
			if (counter == 3)
				state = true;
		}
		return state;
	}

	// method used to see the board after X amount of steps
	public static boolean[][] moveTimeBy(int numOfSteps) {
//		boolean[][] tempBoard = currentBoard;
		for (int k = 0; k < numOfSteps; k++) {
			for (int i = 0; i < currentBoard.length; i++) {
				for (int j = 0; j < currentBoard.length; j++) {
					newBoard[i][j] = checkNeighbors(i, j, currentBoard.length);
				}
			}
		}
		return newBoard;
	}

	// method used to check user new board, and if its ok set it to current board
	public static boolean setBoard(boolean[][] myBoard) {
		int icount = 0, jcount = 0;
		for (int i = 0; i < myBoard.length; i++) {
			icount++;
			for (int j = 0; j < myBoard.length; j++) {
				jcount++;
			}
		}
		if (icount * icount == jcount && currentBoard.length == icount) {
			currentBoard = myBoard;
			return true;
		}
		System.out.println("***ERROR. Set Board Must Have The Same Amount Of Elements As \"X\"***");
		return false;
	}

}