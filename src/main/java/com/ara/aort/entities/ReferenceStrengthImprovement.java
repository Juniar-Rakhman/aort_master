package com.ara.aort.entities;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 */
@Entity
@Table(name = "reference_strength_improvement")
public class ReferenceStrengthImprovement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(name = "category")
    public String category;

    @Column(name = "criteria")
    public String criteria;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }
}
