package com.ara.aort.entities;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/12/16.
 */
@Entity
@Table(name = "user_role")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(name = "staff")
    public Staff staff;

    @Column(name = "general")
    public Boolean general;

    @Column(name = "add_observation")
    public Boolean addObservation;

    @Column(name = "system_admin")
    public Boolean systemAdmin;

    //getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public Boolean getGeneral() {
        return general;
    }

    public void setGeneral(Boolean general) {
        this.general = general;
    }

    public Boolean getAddObservation() {
        return addObservation;
    }

    public void setAddObservation(Boolean addObservation) {
        this.addObservation = addObservation;
    }

    public Boolean getSystemAdmin() {
        return systemAdmin;
    }

    public void setSystemAdmin(Boolean systemAdmin) {
        this.systemAdmin = systemAdmin;
    }
}
