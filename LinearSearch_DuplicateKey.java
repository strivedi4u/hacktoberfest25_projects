import java.util.Scanner;

public class LinearSearch_DuplicateKey {
    public static void main(String args[]) {
        int n, i, key, count = 0;
        int[] arr = new int[100];
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number of elements: ");
        n = sc.nextInt();
        System.out.println("Enter elements: ");
        for(i=0;i<n;i++) {
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter element to be searched for: ");
        key = sc.nextInt();
        for(i=0;i<n;i++) {
            if (key == arr[i]) {
                System.out.println("Element "+arr[i]+" found at "+(i+1));
                count++;
            }
        }
        if (count > 0) {
            System.out.println("Duplicate key Found: "+count);
        }
        else {
            System.out.println("No Duplicate key found");
        }
    }
}
