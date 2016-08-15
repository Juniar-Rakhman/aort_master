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

	@Column(name = "department", columnDefinition = "nvarchar")
	private String department;
	@Column(name = "email", columnDefinition = "nvarchar")
	private String email;
	@Column(name = "first_name", columnDefinition = "nvarchar")
	private String firstName;
	@Id
	@Column(columnDefinition = "nvarchar")
	private String id;
	@Column(name = "last_name", columnDefinition = "nvarchar")
	private String lastName;
	@Column(name = "campus_location", columnDefinition = "nvarchar")
	private String location;
	@Column(name = "office_phone", columnDefinition = "nvarchar")
	private String officePhone;
	@ManyToMany
	@JoinTable(name="staff_position",
			joinColumns=@JoinColumn(name="staff_id", referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="position_id", referencedColumnName="id"))
	private List<Position> positions;
	@Column(name = "username", columnDefinition = "nvarchar")
	private String username;

	public Staff(){

	}

	public void finalize() throws Throwable {

	}

}