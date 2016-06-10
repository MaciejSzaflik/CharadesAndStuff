package services;

import models.User;
import repositories.UserRepository;

public class UserService {
	
	private UserRepository repository;

	public UserService() {
		repository = new UserRepository();
	}
	
	public User get(long id) {
		return repository.get(id);
	}

	public User get(String cookie) {
		return UserRepository.findByCookie(cookie);
	}

	public void insert(User user) {
		repository.insert(user);
	}
	
	public void update(User user) {
		repository.update(user);
	}
	
	public void delete(User user) {
		repository.delete(user);
	}
}