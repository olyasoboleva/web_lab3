package Lab3;

public class Test {
    public static void main(String[] args) {
        PointService pointService = new PointService();
        pointService.setX(10);
        pointService.setY(23);
        pointService.setR(2);
        pointService.addPoint();
    }
}
