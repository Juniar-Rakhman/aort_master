package com.ara.aort.entities;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 */
@Entity
@Table(name = "position")
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(name = "title")
    public String title;

    @Column(name = "full_time_equivalent_ratio")
    public String fte;

    @Column(name = "line_manager")
    public String lineManager;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFte() {
        return fte;
    }

    public void setFte(String fte) {
        this.fte = fte;
    }

    public String getLineManager() {
        return lineManager;
    }

    public void setLineManager(String lineManager) {
        this.lineManager = lineManager;
    }
}
