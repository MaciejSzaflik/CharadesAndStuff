package services;

import java.util.List;

public interface DatabaseOperation <T> {
	public Object get(long id);
	public List<Object> get(Boolean type);
	public void insert(T t);
	public void update(T t);
	public void delete(T t);
}
