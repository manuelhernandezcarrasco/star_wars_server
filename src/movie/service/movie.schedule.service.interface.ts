export abstract class IMovieScheduleServiceInterface {
  abstract handleMovieUpdates(): Promise<void>;
}
