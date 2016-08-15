package nz.ac.ara.aort.entities;


import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "staff")
public class Staff {

	@Column(name = "department")
	private String department;
	@Column(name = "email")
	private String email;
	@Column(name = "first_name")
	private String firstName;
	@Id
	private String id;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "campus_location")
	private String location;
	@Column(name = "office_phone")
	private String officePhone;
	@ManyToMany
	@JoinTable(name="staff_position",
			joinColumns=@JoinColumn(name="staff_id", referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="position_id", referencedColumnName="id"))
	private List<Position> positions;
	@Column(name = "username")
	private String username;

	public Staff(){

	}

	public void finalize() throws Throwable {

	}

}