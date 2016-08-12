package com.ara.aort.entities;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 */

@Entity
@Table(name = "assess_strength_improvement")
public class AssessStrengthImprovement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @OneToOne
    public Observation observation;

    @OneToOne
    public ReferenceStrengthImprovement refStrImp;

    @Column(name = "strength")
    public Boolean strength;

    @Column(name = "improvement")
    public Boolean improvement;

    @Column(name = "evidence")
    public String evidence;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Observation getObservation() {
        return observation;
    }

    public void setObservation(Observation observation) {
        this.observation = observation;
    }

    public ReferenceStrengthImprovement getRefStrImp() {
        return refStrImp;
    }

    public void setRefStrImp(ReferenceStrengthImprovement refStrImp) {
        this.refStrImp = refStrImp;
    }

    public Boolean getStrength() {
        return strength;
    }

    public void setStrength(Boolean strength) {
        this.strength = strength;
    }

    public Boolean getImprovement() {
        return improvement;
    }

    public void setImprovement(Boolean improvement) {
        this.improvement = improvement;
    }

    public String getEvidence() {
        return evidence;
    }

    public void setEvidence(String evidence) {
        this.evidence = evidence;
    }
}
