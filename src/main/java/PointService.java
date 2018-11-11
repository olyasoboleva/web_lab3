import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.LinkedList;

@ManagedBean(name = "point")
@SessionScoped
public class PointService implements Serializable {
    double x = 0;
    double y = 0;
    double r = 4;
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

    public boolean getIsInArea() {
        isArea();
        return isInArea;
    }

    public void setIsInArea(boolean inArea) {
        isInArea = inArea;
    }

    public void isArea () {
        if ((x >= 0) && (y >= 0) && (y <= (r/2-x)/2)) {
            isInArea = true;
        } else {
            if ((x <= 0) && (y >= 0) && ((x * x + y * y) <= r/2 * r/2 / 4)) {
                isInArea = true;
            } else {
                if ((x <= 0) && (y <= 0) && (x >= -r/2) && (y >= -r/2)) {
                    isInArea = true;
                } else {
                    isInArea = false;
                }
            }
        }
    }

    public void addPoint() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        Point point = new Point(getX(),getY(),getR(),getIsInArea());
        points.add(point);
        session.save(point);
        tx1.commit();
        session.close();
    }
}
