package com.ara.aort.entities;


import lombok.Data;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/12/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "user_role")
public class UserRole {

	@Column(name = "add_observation")
	public Boolean addObservation;
	@Column(name = "general")
	public Boolean general;
	@Id@GeneratedValue(strategy = GenerationType.AUTO)
	public Long id;
	@OneToOne(fetch=FetchType.LAZY)@JoinColumn(name="staff_id")
	public Staff staff;
	@Column(name = "system_admin")
	public Boolean systemAdmin;

	public UserRole(){

	}

	public void finalize() throws Throwable {

	}

}