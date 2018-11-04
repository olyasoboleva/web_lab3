package Lab3;

import org.hibernate.Session;
import org.hibernate.Transaction;

import java.io.Serializable;
import java.util.LinkedList;

public class PointService implements Serializable {
    double x;
    double y;
    double r;
    boolean isInArea;
    LinkedList<Point> points = new LinkedList<>();

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public LinkedList<Point> getPoints() {
        return points;
    }

    public void setPoints(LinkedList<Point> points) {
        this.points = points;
    }

    public boolean isInArea() {
        return isInArea;
    }

    public void setInArea() {
        isInArea = isArea(x,y,r);
    }

    public boolean isArea (double x, double y, double r) {
        if ((x >= 0) && (y >= 0) && (y <= -x/2 + 0.5)) {
            return true;
        }
        if ((x <= 0) && (y >= 0) && ((x*x + y*y) <= r*r/4)) {
            return true;
        }
        if ((x <= 0) && (y <= 0) && (x >= -r) && (y >= -r)) {
            return true;
        }
        return false;
    }

    public void addPoint(double x, double y, double r ) {
        isInArea = isArea(x,y,r);
        Point point = new Point(x,y,r,isInArea);
        points.add(point);
        Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.save(point);
        tx1.commit();
        session.close();
    }
}
