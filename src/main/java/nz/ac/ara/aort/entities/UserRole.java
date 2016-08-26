package nz.ac.ara.aort.entities;


import lombok.Data;
import nz.ac.ara.aort.entities.master.Staff;

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

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;

	@Column(name = "add_observation")
	public Boolean addObservation;
	
	@Column(name = "general")
	public Boolean general;

	@Column(name = "system_admin")
	public Boolean systemAdmin;

	@Column(name = "quality_assurance")
	public Boolean qualityAssurance;

	@Column(name = "staff_id", columnDefinition = "nvarchar(50)", unique = true)
	private String staffId;
	@Transient
	public Staff staff;

	public UserRole(){
	}

	public void finalize() throws Throwable {
	}

}