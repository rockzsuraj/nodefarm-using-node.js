import java.util.Arrays;

class Solution {

    public int findGCD(int[] nums) {
        Arrays.sort(nums);
        int min = nums[0];
        int max = nums[nums.length - 1];

        while (min > 0) {
            if (max % min == 0) {
                return min;
            } else {

                int temp = max % min;
                max = min;
                min = temp;
            }
        }

        return min;
    }

    public static void main(String[] args) {

        int[] arr = { 7, 9, 49 };

        Solution solution = new Solution();
        int result = solution.findGCD(arr);
        System.out.println(result);

    }
}