package repositories;

import java.util.List;

public interface RepositoryBase<T> {
	public T get(long id);
	public List<T> get(Boolean value);
	public void insert(T t);
	public void update(T t);
	public void delete(T t);
}
