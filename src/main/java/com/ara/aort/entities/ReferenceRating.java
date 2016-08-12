package com.ara.aort.entities;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 */
@Entity
@Table(name = "reference_rating")
public class ReferenceRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "rating")
    private String rating;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}
