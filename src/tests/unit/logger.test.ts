
import { describe, it, expect, vi, afterEach } from "vitest";
import { Logger } from "../../server/utils/logger";

describe("Logger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("formats each log level with a timestamp and message", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});

    Logger.info("ready");
    Logger.warn("careful");
    Logger.error("failed");
    Logger.debug("details");

    expect(info.mock.calls[0][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[INFO\] ready$/
    );

    expect(warn.mock.calls[0][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[WARN\] careful$/
    );

    expect(error.mock.calls[0][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[ERROR\] failed$/
    );

    expect(debug.mock.calls[0][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[DEBUG\] details$/
    );
  });

  it("logs an Error stack and converts non-Error values to text", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const error = new Error("broken");

    Logger.error(error);
    Logger.error(42);

    expect(errorSpy).toHaveBeenCalledTimes(3);

    expect(errorSpy.mock.calls[0][0]).toMatch(/Error: broken/);

    expect(errorSpy.mock.calls[1][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[ERROR\] broken$/
    );

    expect(errorSpy.mock.calls[2][0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T.+Z\] \[ERROR\] 42$/
    );
  });
});
