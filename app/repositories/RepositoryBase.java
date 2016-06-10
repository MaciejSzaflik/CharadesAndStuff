package repositories;

import java.util.List;

public interface RepositoryBase<T> {
	public T get(long id);
	public void insert(T t);
	public void update(T t);
	public void delete(T t);
}
