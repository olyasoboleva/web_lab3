package Lab3;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "points")
public class Point implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    int id;
    @Column(name = "X")
    double X;
    @Column(name = "Y")
    double Y;
    @Column(name = "R")
    double R;
    @Column(name = "IsInArea")
    boolean isInArea;

    public Point() {}

    public Point(double x, double y, double r, boolean isInArea) {
        X = x;
        Y = y;
        R = r;
        this.isInArea = isInArea;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return X;
    }

    public void setX(double x) {
        X = x;
    }

    public double getY() {
        return Y;
    }

    public void setY(double y) {
        Y = y;
    }

    public double getR() {
        return R;
    }

    public void setR(double r) {
        R = r;
    }

    public boolean isInArea() {
        return isInArea;
    }

    public void setInArea(boolean inArea) {
        isInArea = inArea;
    }
}
